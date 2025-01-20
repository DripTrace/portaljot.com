const formatVariantName = (variantName: string): string => {
    const [, name] = variantName.split(" - ");

    return name ? name : "One style";
};

export default formatVariantName;
