export const classes = ( ...classNames: string[] ): string => classNames.filter(v => !!v).join(" ");
