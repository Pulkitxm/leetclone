export const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email= (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    const rePassword = (e.currentTarget.elements[2] as HTMLInputElement).value;
    const isRequired= (e.currentTarget.elements[3] as HTMLInputElement).checked;

    console.log({
        email,
        password,
        rePassword,
        isRequired
    });
};