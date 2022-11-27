#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

const sleep = () => {
  return new Promise((res) => {
    setTimeout(res, 2000);
  });
};

const welcome = async () => {
  let AnimationTitle = chalkAnimation.rainbow("Let's start Calculation");
  await sleep();
  AnimationTitle.stop();
};

console.clear();
// welcome();

async function askQuestion() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "operator",
      message: "Select Below Options:",
      choices: [
        "Addition",
        "Multiplication",
        "Subtraction",
        "Division",
        "Power",
      ],
    },
    {
      type: "number",
      name: "Number01",
      message: chalk.red("Enter Number 1: "),
      validate: async (input) => {
        if (isNaN(input)) {
          return "Please Input Correct Number";
        }
        return true;
      },
    },
    {
      type: "number",
      name: "Number02",
      message: chalk.red("Enter Number 2: "),
      validate: async (input) => {
        if (isNaN(input)) {
          console.log("Please Input Correct Number");
          return false;
        }
        return true;
      },
    },
  ]);

  if (answers.operator == "Addition") {
    console.log(
      chalk.green(
        `\n> ${answers.Number01} + ${answers.Number02} = ${
          answers.Number01 + answers.Number02
        }\n`
      )
    );
  } else if (answers.operator == "Subtraction") {
    console.log(
      chalk.green(
        `\n> ${answers.Number01} - ${answers.Number02} = ${
          answers.Number01 - answers.Number02
        }\n`
      )
    );
  } else if (answers.operator == "Multiplication") {
    console.log(
      chalk.green(
        `\n> ${answers.Number01} * ${answers.Number02} = ${
          answers.Number01 * answers.Number02
        }\n`
      )
    );
  } else if (answers.operator == "Division") {
    console.log(
      chalk.green(
        `\n> ${answers.Number01} / ${answers.Number02} = ${(
          answers.Number01 / answers.Number02
        ).toFixed(3)}\n`
      )
    );
  } else if (answers.operator == "Power") {
    console.log(
      chalk.green(
        `\n> ${answers.Number01} ^ ${answers.Number02} = ${Math.pow(
          answers.Number01,
          answers.Number02
        ).toFixed(3)}\n`
      )
    );
  }
}

async function continuer() {
  await welcome();
  do {
    await askQuestion();
    var choice = await inquirer.prompt({
      type: "input",
      name: "restart",
      message: chalk.yellow("Do you want to continue? Press y or n ..."),
    });
  } while (
    choice.restart == "y" ||
    choice.restart == "Y" ||
    choice.restart == "yes" ||
    choice.restart == "YES"
  );
}

continuer();
