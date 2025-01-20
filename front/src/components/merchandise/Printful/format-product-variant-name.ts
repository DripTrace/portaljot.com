const formatProductVariantName = (
  productVariantName: string
): string => {
  const [, name] = productVariantName.split(' - ');
  return name ? name : 'One style';
};

export default formatProductVariantName