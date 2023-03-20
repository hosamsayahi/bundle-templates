interface BossType {
  name: string;
  age: number;
}

export default function Boss(props: BossType) {
  return `${props.name} ${props.age}`;
}
