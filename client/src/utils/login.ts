export const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email= (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    const isRequired= (e.currentTarget.elements[2] as HTMLInputElement).checked;

    console.log({
        email,
        password,
        isRequired
    });
};