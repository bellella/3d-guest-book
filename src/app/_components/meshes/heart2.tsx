import { useLoader } from "@react-three/fiber";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useGLTF } from '@react-three/drei'

const Heart2 = ({ position }: { position: any }) => {
    const {nodes, scene} = useLoader(GLTFLoader, '/models/heart.gltf');
    //const group = useGLTF('/models/heart.gltf')
    if (nodes && nodes.yourMesh) {
      }
    return <primitive object={scene} position={position}/>
};
export default Heart2;