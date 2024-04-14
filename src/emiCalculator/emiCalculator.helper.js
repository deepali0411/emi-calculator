export const calculateLoan = (p, r, n) => {
   const emiAmount = (p * r* ((1+r)**n) / ((1+r)**n -1)).toFixed(0);
   return Number(emiAmount);
}

export const calculateDP = (emi, r, n, cost) => {
   const downPayment = 100 -  (emi/calculateLoan(cost, r,n))*100;
   return Number((downPayment/100)*cost).toFixed(0);
}