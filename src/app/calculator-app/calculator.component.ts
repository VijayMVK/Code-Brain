import { expressionType } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/service/common.service';
import { OperatorModel, InputModel } from './calculator.model';

@Component({
  selector: 'calc',
  templateUrl: './calculator.component.html'
})
export class CalcComponent implements OnInit {
  result: number = null;
  inputs: InputModel[] = [
    {
      type: "text",
      value: ""
    },
    {
      type: "select",
      value: ""
    },
    {
      type: "text",
      value: ""
    },
    {
      type: "select",
      value: ""
    },
    {
      type: "text",
      value: ""
    }
  ];
  operators: OperatorModel[] = [
    { name: "add", value: "+" },
    { name: "sub", value: "-" },
    { name: "mul", value: "*" },
    { name: "div", value: "/" }
  ];
  ngOnInit() { }
  isDisable(): boolean {
    const len: number = this.inputs.filter(x => !x.value).length;
    return len ? true : false;
  }
  cal() {
    let expression: string = "";
    this.inputs.map(x => {
      expression = expression + x.value;
    });
    try {
      this.result = eval(expression);
    } catch (e) {
      alert(e);
    }
  }
}
