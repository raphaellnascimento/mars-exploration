export enum Command {
    Left = 'L',
    Right = 'R',
    Move = 'M'
}

export function toCommand(value: string): Command | undefined {
    for (const key in Command) {
        if (Command[key as keyof typeof Command] === value) {
            return Command[key as keyof typeof Command];
        }
    }
    return undefined;
}