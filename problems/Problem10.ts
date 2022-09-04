/**
 * Implement a job scheduler which takes in a function f and an integer n, and calls f after n milliseconds.
 */

 type Job = {
    func: Function,
    completed: boolean,
    delay: number,
    name: string,
}

class Scheduler {
    private _jobs: Map<number, Job> = new Map();
    private readonly _maxPID = 10000;
    private _running = false;
    private _startTime = 0;

    private get _hasPendingJobs(): boolean {
        return this._jobs.size !== 0;
    }

    private _checkIfNeedStop(): void {
        if (this._hasPendingJobs) {
            return;
        }

        console.log(`Scheduler has no more pending jobs, ceasing execution`);
        this._running = false;
    }

    private _generatePID() {
        let pid = -1;

        while (pid === -1) {
            const newPID = Math.ceil(Math.random() * this._maxPID);

            pid = this._jobs.has(newPID) ? -1 : newPID;
        }

        return pid;
    }

    private _wrapJob(func: Function, delay: number, name: string): Job {
        return {
            func,
            completed: false,
            delay,
            name,
        }
    }

    private _executeFunction(job: Job): void {
        console.log(`Starting execution of job ${job.name}`);
        job.func();
        job.completed = true;
        console.log(`Starting execution of job ${job.name}`);
    }

    private async _runJobsLoop(): Promise<void> {
        while(this._running) {
            await new Promise((resolve) => setTimeout(() => {
                this._checkAndRunJobs();
                resolve(-1);
            }, 1000)); // run every second

            this._checkIfNeedStop(); // check to stop the scheduler if we run out of pending jobs (Just for demo purposes, usually you would just call a .stop() method)
        }
    }

    private _jobNeedsToRun(job: Job): boolean {
        return (job.delay <= Date.now() - this._startTime) && job.completed === false;
    }

    private _checkAndRunJobs(): void {
        console.log("Checking jobs that need to run...");

        this._jobs.forEach((job: Job, PID: number) => {
            if (this._jobNeedsToRun(job)) {
                this._executeFunction(job);
                this._jobs.delete(PID);
            }
        });

        console.log("Completed Checking jobs that need to run");
    }

    schedule(func: Function, name: string, delay: number): number {
        const newPID = this._generatePID();

        const job = this._wrapJob(func, delay, name);

        this._jobs.set(newPID, job);

        return newPID;
    }

    start(): void {
        this._running = true;
        this._startTime = Date.now();
        this._runJobsLoop();
    }

    stop(): void {
        this._running = false;
    }
}


// TESTING AREA
const jobFunctionGenerator = (message: string): Function => {
    return () => console.log(`I am job! This is my message: ${message}`);
};

const scheduler = new Scheduler();

const pid1 = scheduler.schedule(jobFunctionGenerator("Job 1"), "job 1", 10000);
const pid2 = scheduler.schedule(jobFunctionGenerator("Job 2"), "job 2", 2000);
const pid3 = scheduler.schedule(jobFunctionGenerator("Job 3"), "job 3", 3000);
const pid4 = scheduler.schedule(jobFunctionGenerator("Job 4"), "job 4", 4000);
const pid5 = scheduler.schedule(jobFunctionGenerator("Job 5"), "job 5", 5000);

scheduler.start();