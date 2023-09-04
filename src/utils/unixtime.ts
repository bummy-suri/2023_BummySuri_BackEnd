const unixTime = () : bigint => {
    const referenceUnixTimeMilliseconds = Date.now();
    const referenceHrTime = process.hrtime();
    
    const currentHrTime = process.hrtime(referenceHrTime);

    const elapsedHrTimeNanoseconds = BigInt(currentHrTime[0]) * BigInt(1e9) + BigInt(currentHrTime[1]);
    const referenceUnixTimeNanoseconds = BigInt(referenceUnixTimeMilliseconds) * BigInt(1e6);
  
    const highResolutionUnixTimeNanoseconds = referenceUnixTimeNanoseconds + elapsedHrTimeNanoseconds;
  
    return highResolutionUnixTimeNanoseconds;
}

export default unixTime;