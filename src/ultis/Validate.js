export class Validate {
    static email(mail) {
        if (/^[\w.-]+@gmail\.com$/.test(mail)) {
            return true;
        }
        return false;
    }

    static Password = (val) => {
        return val.length >= 6;
    };
}
