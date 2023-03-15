"use client";
import { useEffect } from "react";

import * as THREE from "three";
import { MathUtils } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

type Props = {};

const page = (props: Props) => {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const canvas = document.querySelector("#bg") as HTMLCanvasElement;
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.position.setZ(40);

      // * TORUS
      const geometry = new THREE.TorusGeometry(8, 2, 16, 100);
      // const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const material = new THREE.MeshBasicMaterial({ color: 0xD7BDE2, wireframe: true });
      const torus = new THREE.Mesh(geometry, material);
      scene.add(torus);

      // * LIGHTS
      const pointLight = new THREE.PointLight(0x82e0aa);
      pointLight.position.set(15, 10, 5);
      const ambientLight = new THREE.AmbientLight(0x512e5f);
      scene.add(pointLight, ambientLight);

      // * HELPERS
      // const lightHelper = new THREE.PointLightHelper(pointLight);
      // const gridHelper = new THREE.GridHelper(200, 50);
      // scene.add(lightHelper); // Adds little wireframe as light source
      // scene.add(gridHelper); // Adds a grid to mark the "ground"

      // * CONTROLS => Mouse
      const controls = new OrbitControls(camera, renderer.domElement);

      // * BULK CREATE 3D OBJECTS
      const addStar = () => {
        const geometry = new THREE.SphereGeometry(0.25, 24, 24);
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const star = new THREE.Mesh(geometry, material);

        const [x, y, z] = Array(3)
          .fill(0)
          .map(() => THREE.MathUtils.randFloatSpread(100));

        star.position.set(x, y, z);
        scene.add(star);
      };
      Array(400).fill(0).forEach(addStar);

      // * BACKGROUND
      const spaceTexture = new THREE.TextureLoader().load("nasa3.jpg");
      scene.background = spaceTexture;

      // * TEXTURES
      const niklasTexture = new THREE.TextureLoader().load("niklas.jpg");
      const niklas = new THREE.Mesh(
        new THREE.BoxGeometry(5, 5, 5),
        new THREE.MeshBasicMaterial({ map: niklasTexture })
      );
      scene.add(niklas);

      // * JABULANI
      const jabulaniTexture = new THREE.TextureLoader().load("jabulani.png");
      const jabulani = new THREE.Mesh(
        new THREE.SphereGeometry(1.5, 24, 24),
        new THREE.MeshBasicMaterial({ map: jabulaniTexture })
      );
      jabulani.position.set(10, 10, -4);
      scene.add(jabulani);

      // * MOON + NORMAL TEXTURE => ILLUSION OF DEPTH
      const moonTexture = new THREE.TextureLoader().load("moon.jpg");
      const moonNormalTexture = new THREE.TextureLoader().load("normal.jpg");
      const moon = new THREE.Mesh(
        new THREE.SphereGeometry(3, 24, 24),
        new THREE.MeshStandardMaterial({
          map: moonTexture,
          normalMap: moonNormalTexture,
        })
      );
      moon.position.set(-10, 10, -4);
      scene.add(moon);

      // * ANIMATION REFRESH FUNCTION
      const animate = () => {
        requestAnimationFrame(animate);

        torus.rotation.x += 0.005;
        torus.rotation.z += 0.005;
        torus.rotation.y -= 0.005;

        jabulani.rotation.y += 0.008;

        moon.rotation.y += 0.0005;
        moon.rotation.z += 0.0005;

        controls.update();

        renderer.render(scene, camera);
      };

      animate();
    }
  }, []);

  return (
    <>
      <canvas id="bg" className="fixed top-0 left-0"></canvas>
      <div className="absolute font-thin m-6 text-2xl">
        This will be a beautiful porfolio using
        <ul>
          <li className="font-thin ml-10 m-2 text-lg">✔ Next.js 13</li>
          <li className="font-thin ml-10 m-2 text-lg">✔ Typescript</li>
          <li className="font-thin ml-10 m-2 text-lg">✔ React</li>
          <li className="font-thin ml-10 m-2 text-lg">✔ Tailwind3</li>
          <li className="font-thin ml-10 m-2 text-lg">✔ Three.js</li>
        </ul>
      </div>
    </>
  );
};

export default page;
