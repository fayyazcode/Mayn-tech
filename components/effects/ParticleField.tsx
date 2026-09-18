"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * A drifting point field behind the hero. Deliberately quiet: low opacity,
 * slow motion, and parallax that follows the pointer rather than chasing it.
 *
 * Loaded dynamically and skipped entirely on reduced motion, coarse pointers
 * and low core counts, so phones never pay for it.
 */
export function ParticleField({ className = "" }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = host.current;
    if (!el || reduced) return;

    const weak =
      window.matchMedia("(pointer: coarse)").matches ||
      (navigator.hardwareConcurrency ?? 4) <= 4;
    if (weak) return;

    let frame = 0;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.z = 14;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // colour is read from the active theme, so the field inverts with it
    const readInk = () =>
      new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue("--ink").trim() || "#f2f3f4");

    const COUNT = 900;
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 42;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 22;
      speeds[i] = 0.004 + Math.random() * 0.012;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.075,
      color: readInk(),
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onPointer = (event: PointerEvent) => {
      target.x = (event.clientX / window.innerWidth - 0.5) * 2;
      target.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const themeWatcher = new MutationObserver(() => material.color.set(readInk()));
    themeWatcher.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const attribute = geometry.getAttribute("position") as THREE.BufferAttribute;

    const tick = () => {
      frame = requestAnimationFrame(tick);

      for (let i = 0; i < COUNT; i++) {
        const y = attribute.getY(i) + speeds[i];
        attribute.setY(i, y > 12 ? -12 : y);
      }
      attribute.needsUpdate = true;

      pointer.x += (target.x - pointer.x) * 0.035;
      pointer.y += (target.y - pointer.y) * 0.035;
      points.rotation.y = pointer.x * 0.16;
      points.rotation.x = pointer.y * 0.1;

      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      if (!el.clientWidth) return;
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // stop burning frames when the tab is hidden
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(frame);
      else tick();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      themeWatcher.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, [reduced]);

  return <div ref={host} aria-hidden className={`pointer-events-none absolute inset-0 ${className}`} />;
}
