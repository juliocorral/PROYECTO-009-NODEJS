export function DateFormat(date) {
    return new Intl.DateTimeFormat("es-ES", {
        dateStyle: "long",
        timeStyle: "short",
    }).format(date);
}
    