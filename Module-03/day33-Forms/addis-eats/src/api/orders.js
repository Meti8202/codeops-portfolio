export async function placeOrder(form, cartItems) {
  // pretend network delay
  await new Promise((r) => setTimeout(r, 800));

  // server rejection
  // if (form.phone.endsWith("0000")) {
  //   const err = new Error("Validation failed");
  //   err.status = 422;
  //   err.fieldErrors = { phone: "That number is not registered with TeleBirr" };
  //   throw err;
  // }

  return {
    id: `order-${Date.now()}`,
    ...form,
    items: cartItems,
  };
}
