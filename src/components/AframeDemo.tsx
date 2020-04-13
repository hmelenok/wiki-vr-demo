import "aframe";
// import 'aframe-particle-system-component';
// @ts-ignore
import { Entity, Scene } from "aframe-react";
import React from "react";

class AframeDemo extends React.Component {
  render() {
    return (
      <Scene light="defaultLightsEnabled: false" debug inspector={"url: https://cdn.jsdelivr.net/gh/aframevr/aframe-inspector@master/dist/aframe-inspector.min.js"}>
        <Entity primitive="a-sky" src={"/sky/sky-simple.png"} />
        <Entity
          light={{ type: "point", intensity: 1.6 }}
          color={"#222"}
          position={"-9 5 0"}
        />
        <Entity
          geometry={{ primitive: "box" }}
          material={{ color: "red" }}
          position={{ x: 0, y: 0.5, z: -5 }}
        />
        <Entity
          primitive="a-plane"
          src={"/plane/red-pavement.jpg"}
          position={{ x: 0, y: 0, z: -5 }}
          rotation="-90 0 0"
          height={"10"}
          width={"10"}
          {...{
            "normal-map": "/plane/red-pavement-map2.jpg",
            "ambient-occlusion-map": "/plane/red-pavement-map.jpg",
          }}
        />
      </Scene>
    );
  }
}

export default AframeDemo;
