/**
 * QA Test Data Generator Utilities
 * Author: Yulia Agustin
 * 
 * Generates valid dynamic test data for Indonesian fintech and form submissions.
 */

class TestDataGenerator {
  /**
   * Generates a realistic 16-digit Indonesian NIK (Nomor Induk Kependudukan).
   * Format: [Provinsi/Kota 4 digits][Kecamatan 2 digits][DDMMYY 6 digits][Urutan 4 digits]
   */
  static generateNik(isFemale = false, birthYear = 1995) {
    const provKota = '3171'; // DKI Jakarta Pusat
    const kec = '01';
    
    let day = Math.floor(Math.random() * 28) + 1;
    if (isFemale) day += 40; // Indonesian female NIK day offset
    const dayStr = String(day).padStart(2, '0');
    
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const yearShort = String(birthYear).slice(-2);
    
    const sequence = String(Math.floor(Math.random() * 9000) + 1000);
    
    return `${provKota}${kec}${dayStr}${month}${yearShort}${sequence}`;
  }

  /**
   * Generates a valid Indonesian mobile number with standard prefixes.
   */
  static generatePhoneNumber() {
    const prefixes = ['0812', '0813', '0821', '0852', '0878', '0896'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = Math.floor(10000000 + Math.random() * 90000000);
    return `${prefix}${randomSuffix}`;
  }

  /**
   * Generates a full loan application submission payload.
   */
  static generateLoanPayload() {
    const nik = this.generateNik();
    return {
      submissionId: `SUB-${Date.now()}`,
      applicantNik: nik,
      fullName: `Test Applicant ${nik.slice(-4)}`,
      phoneNumber: this.generatePhoneNumber(),
      requestedAmount: Math.floor(Math.random() * 5 + 1) * 25000000,
      tenorMonths: [12, 24, 36, 48][Math.floor(Math.random() * 4)],
      idempotencyKey: `idemp-${Date.now()}-${nik.slice(-6)}`,
      createdAt: new Date().toISOString()
    };
  }
}

// Example usage demonstration:
if (require.main === module) {
  console.log('--- Generated Test Data ---');
  console.log('Sample NIK:', TestDataGenerator.generateNik());
  console.log('Sample Phone:', TestDataGenerator.generatePhoneNumber());
  console.log('Sample Full Payload:\n', JSON.stringify(TestDataGenerator.generateLoanPayload(), null, 2));
}

module.exports = TestDataGenerator;
