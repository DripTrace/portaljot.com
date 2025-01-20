const isActiveLink = (href: string, currentPathname: string): boolean => {
    if (href === "/merchandise") {
        return href === currentPathname;
    }

    return currentPathname.startsWith(href);
};
export default isActiveLink;
