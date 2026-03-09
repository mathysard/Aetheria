class Error {
    /**
     * exists
     */
    public exists() {
        return localStorage.getItem("error") !== null;
    }

    /**
     * getAll
     */
    public getAll() {
        return JSON.parse(localStorage.getItem("error") as string);
    }

    /**
     * set
     */
    public set(error: string) {
        let errors = this.exists() ? this.getAll() : [];
        localStorage.setItem('error', JSON.stringify([...errors, error]));
    }

    /**
     * clear
     */
    public clear() {
        localStorage.removeItem('error');
    }
}

export default Error