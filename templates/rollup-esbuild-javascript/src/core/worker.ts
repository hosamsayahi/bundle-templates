interface WorkerType {
  name: string;
  age: number;
}

export default function Worker(props: WorkerType) {
  return `${props.name} ${props.age}`;
}
