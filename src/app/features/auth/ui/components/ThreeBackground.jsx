import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // --- Particles ---
    const particleCount = 220;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 160;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

      const shade = 0.3 + Math.random() * 0.5;
      colors[i * 3]     = shade;
      colors[i * 3 + 1] = shade;
      colors[i * 3 + 2] = shade;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Isometric Grid Lines ---
    const gridMat = new THREE.LineBasicMaterial({ color: 0x222222, transparent: true, opacity: 0.45 });
    const gridGroup = new THREE.Group();

    const spacing = 10;
    const count = 14;
    const size = count * spacing;

    for (let i = -count; i <= count; i++) {
      // Horizontal
      const hGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-size, i * spacing * 0.5, 0),
        new THREE.Vector3(size,  i * spacing * 0.5, 0),
      ]);
      gridGroup.add(new THREE.Line(hGeo, gridMat));

      // Diagonal \
      const d1Geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(i * spacing - size, -size * 0.5, 0),
        new THREE.Vector3(i * spacing + size,  size * 0.5, 0),
      ]);
      gridGroup.add(new THREE.Line(d1Geo, gridMat));

      // Diagonal /
      const d2Geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(i * spacing - size,  size * 0.5, 0),
        new THREE.Vector3(i * spacing + size, -size * 0.5, 0),
      ]);
      gridGroup.add(new THREE.Line(d2Geo, gridMat));
    }

    gridGroup.position.z = -20;
    scene.add(gridGroup);

    // --- Floating wireframe box ---
    const boxGeo = new THREE.BoxGeometry(14, 14, 14);
    const boxEdges = new THREE.EdgesGeometry(boxGeo);
    const boxLine = new THREE.LineSegments(
      boxEdges,
      new THREE.LineBasicMaterial({ color: 0x404040, transparent: true, opacity: 0.7 })
    );
    boxLine.position.set(-38, 14, -5);
    scene.add(boxLine);

    // --- Floating wireframe octahedron ---
    const octGeo = new THREE.OctahedronGeometry(8, 0);
    const octEdges = new THREE.EdgesGeometry(octGeo);
    const octLine = new THREE.LineSegments(
      octEdges,
      new THREE.LineBasicMaterial({ color: 0x505050, transparent: true, opacity: 0.55 })
    );
    octLine.position.set(38, -12, -8);
    scene.add(octLine);

    // --- Ring ---
    const ringGeo = new THREE.TorusGeometry(10, 0.3, 6, 40);
    const ringEdges = new THREE.EdgesGeometry(ringGeo);
    const ringLine = new THREE.LineSegments(
      ringEdges,
      new THREE.LineBasicMaterial({ color: 0x383838, transparent: true, opacity: 0.5 })
    );
    ringLine.position.set(30, 20, -15);
    ringLine.rotation.x = Math.PI / 4;
    scene.add(ringLine);

    // --- Mouse parallax ---
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- Resize ---
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- Animation ---
    let frameId;
    let t = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      t += 0.004;

      particles.rotation.y = t * 0.04 + mouseX * 0.03;
      particles.rotation.x = mouseY * 0.015;

      boxLine.rotation.x = t * 0.35;
      boxLine.rotation.y = t * 0.55;

      octLine.rotation.x = t * 0.28;
      octLine.rotation.z = t * 0.42;

      ringLine.rotation.y = t * 0.22;
      ringLine.rotation.z = t * 0.12;

      gridGroup.rotation.x = mouseY * 0.006;
      gridGroup.rotation.y = mouseX * 0.006;

      camera.position.x += (mouseX * 4 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 4 - camera.position.y) * 0.04;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default ThreeBackground;
