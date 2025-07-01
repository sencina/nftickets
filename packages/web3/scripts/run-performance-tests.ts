import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

function runTests() {
    try {
        // Run the tests and capture output
        const output = execSync('npx hardhat test test/NFTicketPerformance.test.ts', { encoding: 'utf8' });

        // Extract performance metrics
        const lines = output.split('\n');
        const performanceData: string[] = [];
        let isPerformanceSection = false;

        for (const line of lines) {
            if (line.includes('NFTicket Performance Tests')) {
                isPerformanceSection = true;
                performanceData.push('# NFTicket Performance Test Report\n');
                continue;
            }

            if (isPerformanceSection && line.trim() !== '') {
                performanceData.push(line);
            }
        }

        // Generate report
        const report = performanceData.join('\n');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const reportPath = path.join(__dirname, '..', 'reports');
        
        // Create reports directory if it doesn't exist
        if (!fs.existsSync(reportPath)) {
            fs.mkdirSync(reportPath);
        }

        const reportFile = path.join(reportPath, `performance-report-${timestamp}.md`);
        fs.writeFileSync(reportFile, report);

        console.log(`Performance report saved to: ${reportFile}`);
    } catch (error) {
        console.error('Error running performance tests:', error);
        process.exit(1);
    }
}

runTests(); 