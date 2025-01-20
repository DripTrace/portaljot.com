const hasStripe = () => typeof window !== 'undefined' && window.Stripe;

export default hasStripe