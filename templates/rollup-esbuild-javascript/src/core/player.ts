interface PlayerType {
  name: string;
  age: number;
}

export default function Player(props: PlayerType) {
  return `${props.name} ${props.age}`;
}