"use client";

import { useEffect, useRef } from "react";

interface ParticleFieldProps {
  accentColor?: string;
  particleCount?: number;
  className?: string;
}

const ParticleField = ({
  accentColor = "#cbff47",
  particleCount = 1400,
  className = "",
}: ParticleFieldProps) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let frame = 0;
    let disposed = false;
    let dispose = () => {};
    const mouse = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    import("three").then((THREE) => {
      if (disposed) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        60,
        mount.clientWidth / mount.clientHeight,
        0.1,
        100
      );
      camera.position.z = 13;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mount.appendChild(renderer.domElement);

      // Fibonacci-sphere particle cloud
      const radius = 6.4;
      const positions = new Float32Array(particleCount * 3);
      const golden = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < particleCount; i++) {
        const y = 1 - (i / (particleCount - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = golden * i;
        positions[i * 3] = Math.cos(theta) * r * radius;
        positions[i * 3 + 1] = y * radius;
        positions[i * 3 + 2] = Math.sin(theta) * r * radius;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({
        color: new THREE.Color(accentColor),
        size: 0.045,
        transparent: true,
        opacity: 0.85,
      });
      const points = new THREE.Points(geo, mat);
      scene.add(points);

      // sparse white inner dust
      const dustCount = 380;
      const dust = new Float32Array(dustCount * 3);
      for (let i = 0; i < dustCount; i++) {
        dust[i * 3] = (Math.random() - 0.5) * 16;
        dust[i * 3 + 1] = (Math.random() - 0.5) * 16;
        dust[i * 3 + 2] = (Math.random() - 0.5) * 16;
      }
      const dustGeo = new THREE.BufferGeometry();
      dustGeo.setAttribute("position", new THREE.BufferAttribute(dust, 3));
      const dustMat = new THREE.PointsMaterial({
        color: 0xf5f5f3,
        size: 0.03,
        transparent: true,
        opacity: 0.4,
      });
      const dustPoints = new THREE.Points(dustGeo, dustMat);
      scene.add(dustPoints);

      // wireframe icosahedron lattice
      const ico = new THREE.IcosahedronGeometry(4.1, 1);
      const wire = new THREE.LineSegments(
        new THREE.WireframeGeometry(ico),
        new THREE.LineBasicMaterial({
          color: new THREE.Color(accentColor),
          transparent: true,
          opacity: 0.14,
        })
      );
      scene.add(wire);

      const timer = new THREE.Timer();

      const animate = () => {
        if (disposed) return;
        timer.update();
        const t = timer.getElapsed();

        points.rotation.y = t * 0.06 + mouse.x * 0.4;
        points.rotation.x = mouse.y * 0.3;
        dustPoints.rotation.y = -t * 0.04;
        wire.rotation.y = t * 0.12 + mouse.x * 0.4;
        wire.rotation.x = -t * 0.05 + mouse.y * 0.3;

        renderer.render(scene, camera);
        frame = requestAnimationFrame(animate);
      };
      animate();

      const onResize = () => {
        if (!mount) return;
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };
      window.addEventListener("resize", onResize);

      dispose = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", onResize);
        geo.dispose();
        mat.dispose();
        dustGeo.dispose();
        dustMat.dispose();
        ico.dispose();
        wire.geometry.dispose();
        (wire.material as { dispose: () => void }).dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === mount) {
          mount.removeChild(renderer.domElement);
        }
      };
    });

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      disposed = true;
      window.removeEventListener("mousemove", onMouseMove);
      dispose();
    };
  }, [accentColor, particleCount]);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
};

export default ParticleField;
