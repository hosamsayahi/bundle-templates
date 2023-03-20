interface GreetType {
  say: string;
  reaction: string;
}

export default function Greet(person: string) {
  const Person: GreetType = { say: person, reaction: 'No Interested !!' };
  return Person;
}
