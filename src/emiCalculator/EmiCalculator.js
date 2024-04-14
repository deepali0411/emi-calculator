import React, { useState, useEffect } from "react";
import cx from "classnames";
import styles from "./emiCalculator.module.scss";
import { TENURE } from "./emiCalCulator.constants";
import { cal, calculateDP, calculateLoan } from "./emiCalculator.helper";

const EmiCalculator = (props) => {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [loan, setLoan] = useState(0);
  const [tenure, setTenure] = useState(12);

  useEffect(() => {
    if (cost <= 0) {
      setDownPayment(0);
      setLoan(0);
    } else {
      const emi = calculateLoan(cost - downPayment, interest, tenure / 12) || 0;
      setLoan((emi / tenure).toFixed(0));
    }
  }, [tenure, cost, interest]);

  const handleUpdateDownPayment = (e) => {
    if (!cost) return;
    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0));
    const principleAmount = cost - dp;
    const loanAmt = calculateLoan(principleAmount, interest, tenure / 12) || 0;
    setLoan((loanAmt / tenure).toFixed(0));
  };

  const handleUpdateEmi = (e) => {
    if (!cost) return;
    const emi = Number(e.target.value);
    setLoan(emi);
    const dp = interest ? calculateDP(emi * tenure, interest, tenure / 12, cost) : 0;;
    setDownPayment(dp);
  };

  const calculateEmi = (cost) => {
    const emi = calculateLoan(cost, interest, tenure / 12);
    
    return emi>0 ? (emi / tenure).toFixed(0) : cost;
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>EMI Calculator</div>
      <div className={styles.inputBox}>
        <label className={styles.label}>Total Cost of Assets</label>
        <input
          className={styles.input}
          type="number"
          value={cost===0 ? '' : cost.toString()}
          onChange={(e) => {
            const val = e.target.value;
            if (val >= 0) setCost(Number(e.target.value));
          }}
        />
      </div>
      <div className={styles.inputBox}>
        <label className={styles.label}>Interest Rate (in %)</label>
        <input
          className={styles.input}
          type="number"
          value={interest===0 ? '' : interest.toString()}
          onChange={(e) => {
            const val = e.target.value;
            if (val >= 0) setInterest(Number(e.target.value));
          }}
        />
      </div>
      <div className={styles.inputBox}>
        <label className={styles.label}>Processing Fee (in %)</label>
        <input
          className={styles.input}
          type="number"
          value={fee===0 ? '' : fee.toString()}
          onChange={(e) => {
            const val = e.target.value;
            if (val >= 0) setFee(Number(e.target.value));
          }}
        />
      </div>
      <div className={styles.inputBox}>
        <label className={styles.label}>Down Payment</label>
        <div className={styles.totalAmout}>
          Total downPayment -{" "}
          {Number(Number(downPayment) + Number((cost * fee) / 100)).toFixed(0)}
        </div>
        <input
          className={styles.input}
          type="range"
          min={0}
          max={cost}
          value={downPayment}
          onChange={handleUpdateDownPayment}
          disabled={!cost || !interest}
        />
        <div className={styles.labels}>
          <label className={styles.label}>0</label>
          <b className={styles.label}>{downPayment}</b>
          <label className={styles.label}>100%</label>
        </div>
      </div>
      <div className={styles.inputBox}>
        <label className={styles.label}>Loan Per Month</label>
        <div className={styles.totalAmout}>
          Total loan amount - {loan * tenure}
        </div>
        <input
          className={styles.input}
          type="range"
          min={0}
          max={calculateEmi(cost)}
          value={loan}
          onChange={handleUpdateEmi}
          disabled={!cost || !interest}
        />
        <div className={styles.labels}>
          <label className={styles.label}>0</label>
          <b className={styles.label}>{loan}</b>
          <label className={styles.label}>{calculateEmi(cost)}</label>
        </div>
      </div>
      <div className={styles.tenure}>
        <label className={styles.label}>Tenure</label>
        <div className={styles.buttons}>
          {TENURE.map((item) => {
            return (
              <button
                className={cx(styles.tenureButton, {
                  [styles.focused]: tenure === item,
                })}
                onClick={() => setTenure(item)}
                key={item}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default EmiCalculator;
