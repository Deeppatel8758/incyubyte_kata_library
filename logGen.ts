import * as fs from 'fs';
fs.mkdir('./testresult',{recursive:true}, (err) => {
    if (err) {
      console.error('Error creating directory:', err);
    } else {
      console.log('Directory created successfully');
    }
  });
const inputFilePath = 'results.json';
const outputFilePath = './testresult/TestLog.txt';

// Read and parse the JSON data
try {
    const data = fs.readFileSync(inputFilePath, 'utf-8');
    const results = JSON.parse(data);

    const formatResults = (results: any): string => {
        let output = `Test Results:\n\n`;

        output += `Total Test Suites: ${results.numTotalTestSuites}\n`;
        output += `Total Tests: ${results.numTotalTests}\n`;
        output += `Passed Test Suites: ${results.numPassedTestSuites}\n`;
        output += `Passed Tests: ${results.numPassedTests}\n`;
        output += `Failed Test Suites: ${results.numFailedTestSuites}\n`;
        output += `Failed Tests: ${results.numFailedTests}\n`;
        output += `Pending Test Suites: ${results.numPendingTestSuites}\n`;
        output += `Pending Tests: ${results.numPendingTests}\n`;
        output += `Runtime Error Test Suites: ${results.numRuntimeErrorTestSuites}\n`;
        output += `Todo Tests: ${results.numTodoTests}\n\n`;

        for (const suite of results.testResults) {
         
            const ancestorTitles = suite.ancestorTitles || [];
            output += `Test Suite: ${ancestorTitles.join(' > ')}\n`;

            for (const test of suite.assertionResults) {
                output += `  Test: ${test.fullName}\n`;
                output += `    Status: ${test.status}\n`;

                if (test.status === 'failed') {
                    output += `    Failure Messages:\n`;
                    for (const message of test.failureMessages || []) {
                        output += `      - ${message}\n`;
                    }
                }
            }

            output += '\n';
        }

        return output;
    };

    //now we wirte outeput in new file
    const formattedResults = formatResults(results);
    fs.writeFileSync(outputFilePath, formattedResults);

    console.log(`Formatted results have been written to ${outputFilePath}`);
} catch (error) {
    console.error('An error occurred:', error.message);
}
