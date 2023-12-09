# Training Evaluation App

[![React](https://img.shields.io/badge/React-16.13.1-blue.svg)](https://reactjs.org/)
[![Python](https://img.shields.io/badge/Python-3.x-green.svg)](https://www.python.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Description

The Training Evaluation App is a mockup app designed for the sales team to showcase the use of digital signatures in the document flow, specifically in the context of employee training evaluations.

## Features

- Employees can log in and view a list of training sessions conducted by the company.
- Staff can select a training session, fill out the evaluation form, and submit it to the system with a digital signature.
- Evaluations are sent to the respective HR for approval.
- HR users can log in to view a list of evaluations submitted by staff and approve them with a digital signature.

## Installation

### Prerequisites

- Python 3.x
- Docker (for running MySQL server)
- DataGrip or any preferred DBMS for MySQL

### Steps

1. Clone the repository: `git clone <repository-url>`
2. Set up the MySQL server using Docker: `docker-compose up -d`
3. Connect to the MySQL database using DataGrip or your preferred DBMS.
4. Open the backend code in your IDE (e.g., VSCode) and run `server.py`.
5. Open the frontend code in your IDE, open the terminal, and run `npm install` followed by `npm start`.

## Usage

1. Log in as a staff member to view and evaluate training sessions.
2. Submit the evaluation with a digital signature.
3. Log in as an HR member to view and approve evaluations with a digital signature.

## Use Case

INSECURITOS LTD organizes internal training sessions at least twice a month. After each training, employees are required to fill in evaluation forms to provide feedback to the organizer and trainer. To streamline the evaluation process and avoid burdensome email communications, the Training Evaluation App allows for effective management of the evaluation flow. The use of digital signatures ensures that documents are legally signed by both staff and HR, demonstrating the versatility of digital signatures in various scenarios.

## Contributing

This app is maintained and developed by the creator and is not open for external contributions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
