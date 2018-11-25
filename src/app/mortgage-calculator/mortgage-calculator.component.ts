import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-mortgage-calculator',
  templateUrl: './mortgage-calculator.component.html',
  styleUrls: ['./mortgage-calculator.component.css']
})
export class MortgageCalculatorComponent implements OnInit {
    calculator: FormGroup;
    purchasePrice = 425000;
    downPaymentPercents = [0.03, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.40, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8];
    downPaymentPercent = 0.2;
    loanTerms = [10,15,20,25,30,40];
    loanTerm = 30;
    propertyTaxPercent = 0.012;
    mortgageBrackets = ["4.0%", "4.25%", "4.5%", "4.75%", "5.0%", "5.25%", "5.5%"];
    homeInsurance = Math.floor(this.purchasePrice / 100000) * 35 * 12;
    chart = [];

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.calculator = this.formBuilder.group({
            loanTerm: [null, Validators.required],
            purchasePrice: [null, Validators.required],
            homeInsurance: [null, Validators.required],
            downPaymentPercent: [null, Validators.required],
            propertyTaxPercent: [null, Validators.required]
		});

        const defaultLoanTerm = this.loanTerms.find(c => c == 30);
        const defaultDownPayment = this.downPaymentPercents.find(c => c == 0.2);

        this.calculator.get('loanTerm').setValue(defaultLoanTerm);
        this.calculator.get('purchasePrice').setValue(this.purchasePrice);
        this.calculator.get('homeInsurance').setValue(this.homeInsurance);
        this.calculator.get('downPaymentPercent').setValue(defaultDownPayment);
        this.calculator.get('propertyTaxPercent').setValue(this.propertyTaxPercent);

        this.loadChart();
    }

    calculateMortgage() {

        let purchasePrice = this.calculator.get('purchasePrice').value;
        let propertyTaxPercent = this.calculator.get('propertyTaxPercent').value;
        let homeInsurance = this.calculator.get('homeInsurance').value;
        this.loanTerm = this.calculator.get('loanTerm').value;
        this.downPaymentPercent = this.calculator.get('downPaymentPercent').value;

        if(typeof purchasePrice === 'string') {
            this.purchasePrice = Number(purchasePrice.match(/[0-9]+/g).join(''));
            this.calculator.get('purchasePrice').setValue(this.numberFormatter(purchasePrice));
        }

        if(typeof propertyTaxPercent === 'string') {
            let float = parseFloat(propertyTaxPercent);
            this.propertyTaxPercent = float / 100; 
            this.calculator.get('propertyTaxPercent').setValue(this.percentFormatter(float));
        }

        if(typeof homeInsurance === 'string') {
            this.homeInsurance = Number(homeInsurance.match(/[0-9]+/g).join(''));
            this.calculator.get('homeInsurance').setValue(this.numberFormatter(homeInsurance));
        }
        this.loadChart();
    }

    payments() {
        const monthlyPayments = [];
        const loanAmount = this.purchasePrice - (this.purchasePrice * this.downPaymentPercent);
        for (let i = 0; i < this.mortgageBrackets.length; i++) {
            const rate = parseFloat(this.mortgageBrackets[i]) / 100 / 12;
            let monthly = loanAmount * rate / (1 - Math.pow(1 / (1 + rate), this.loanTerm * 12));
            monthlyPayments.push(monthly);  
        }
        console.log('I am the monthly payments: ', monthlyPayments);
        return monthlyPayments;
    }

    percentFormatter(number) {
        return number.toFixed(2) + '%';
    }

    numberFormatter(number) {
        let originalString = number.match(/[0-9]+/g).join('').split('');
            let reversedArr = originalString.reverse().join('').replace(/(\d{3})(?!$)/g, "$1,").split('');
            let newString = reversedArr.reverse().join('')
            return '$' + newString;
    }

    disableLetters(value, target) {
        if(value) {
            target.value = this.numberFormatter(target.value);
        }
    }

    keyDownDisable(value) {
        if ((value >= 65 && value <= 90)) {
            return false;
        }
    }

    calculatePropTax() {
        const propTaxArray = [];
        for (let i = 0; i < this.mortgageBrackets.length; i++) {
            propTaxArray.push(Math.floor((this.purchasePrice * this.propertyTaxPercent) / 12));
        }
        return propTaxArray;
    }

    calculateHomeInsurance() {
        let monthlyPaymentArray = [];
        const hundredCount = Math.floor(this.purchasePrice / 100000);
        for (let i = 0; i < this.mortgageBrackets.length; i++) {
            monthlyPaymentArray.push(35 * hundredCount);
        }
        return monthlyPaymentArray;
    }

    loadChart() {
        let numberWithCommas = (value) => {
            let n = parseFloat(value).toFixed(2)
            return '$' + Number(n).toLocaleString('en');
        }
        let ctx = document.getElementById("canvas");
        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: this.mortgageBrackets,
              datasets: [{
                type: 'bar',
                label: 'Mortgage',
                backgroundColor: "#303F9F",
                data: this.payments(),
              },{
                type: 'bar',
                label: 'Property Tax',
                backgroundColor: "#BDBDBD",
                data: this.calculatePropTax()
              },{
                type: 'bar',
                label: 'Insurance',
                backgroundColor: "#03A9F4",
                data: this.calculateHomeInsurance(),
              }]
            },
            options: {
                tooltips: {
					mode: 'label',
                    callbacks: {
                        label: function(tooltipItem, data) {
                            var total = 0;
                            for (var i = 0; i < data.datasets.length; i++)
                            total += data.datasets[i].data[tooltipItem.index];
                            
                            if (tooltipItem.datasetIndex != data.datasets.length - 1) {
                                return data.datasets[tooltipItem.datasetIndex].label + ": " + numberWithCommas(tooltipItem.yLabel);
                            } else {
                                return [data.datasets[tooltipItem.datasetIndex].label + ": " + numberWithCommas(tooltipItem.yLabel), "Total :" + numberWithCommas(total)];
                            }
                        }
                    }
                },
                scales: {
                    xAxes: [{
                        stacked: true,
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        }}],
                    yAxes: [{
                        stacked: true,
                        ticks: {
                            callback: (value) => numberWithCommas(value),
                        }, 
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                    }}]
                }
            }
        });
    }
}
