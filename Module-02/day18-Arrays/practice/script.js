const prices = [250, 600, 180, 900, 1200]; 

const withVat = prices.map((p) => p * 1.15);
const under1000 = withVat.filter((p) => p < 1000);
const total = under1000.reduce((sum, p) => sum + p, 0);

console.log(withVat);
console.log(under1000);
console.log(total);
const customer = {
  name: "Almaz Bekele",
  city: "Addis Ababa",
  balance: 1500,
};

for (const [key, value] of Object.entries(customer)) {
  console.log(key, value);
}

const { name, city } = customer;

function greet({ name }) {
  return `Selam ${name}`;
}

console.log(name, city);
console.log(greet(customer));

const updated = {
  ...customer,
  city: "Bahir Dar",
  phone: "0911234567",
};

console.log("original:", customer);
console.log("updated:", updated);
