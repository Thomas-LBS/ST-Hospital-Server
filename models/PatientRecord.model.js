const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const patientRecordSchema = new Schema(
  {
    user: {
      type: { type: Schema.Types.ObjectId, ref: "User" },
      required: true,
    },

    record:[ {
      doctor: {
        type: { type: Schema.Types.ObjectId, ref: "Doctor" },
        required: true,
      },
      appointment: {
        type: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
      },
      vitals: {
        bloodPressure: {
          value: {
            type: String,
          },
          range: {
            type: String,
          },
        },
        heartRate: {
          value: {
            type: String,
          },
          range: {
            type: String,
          },
        },
        pulseRate: {
          value: {
            type: String,
          },
          range: {
            type: String,
          },
        },
        weight: {
          value: {
            type: String,
          },
        },
      },
      complaints: {
        type: String,
        // Define fields for patient complaints during the appointment
      },
      description: {
        type: String,
        // Description of the appointment or medical findings
      },
      prescribedMedications: {
        type: String,
        // Information about prescribed medications
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);
patientRecordSchema.pre("save", async function (next) {
  const bloodPressureValue = this.record.vitals.bloodPressure.value;
  if (bloodPressureValue > "140/90") {
    this.record.vitals.bloodPressure.range = "High";
  } else if (bloodPressureValue < "90/60") {
    this.record.vitals.bloodPressure.range = "Low";
  } else {
    this.record.vitals.bloodPressure.range = "Normal";
  }
  next();
});

patientRecordSchema.pre("save", function (next) {
  const heartRateValue = this.record.vitals.heartRate.value;

  // Example logic for heart rate range calculation (customize as needed)
  if (heartRateValue > "100") {
    this.record.vitals.heartRate.range = "High";
  } else if (heartRateValue < "60") {
    this.record.vitals.heartRate.range = "Low";
  } else {
    this.record.vitals.heartRate.range = "Normal";
  }

  next();
});

patientRecordSchema.pre("save", function (next) {
  const pulseRateValue = this.record.vitals.pulseRate.value;

  // Example logic for pulse rate range calculation (customize as needed)
  if (pulseRateValue > "100") {
    this.record.vitals.pulseRate.range = "High";
  } else if (pulseRateValue < "60") {
    this.record.vitals.pulseRate.range = "Low";
  } else {
    this.record.vitals.pulseRate.range = "Normal";
  }

  next();
});

const PatientRecord = model("PatientRecord", patientRecordSchema);

module.exports = PatientRecord;

//can i have a function here which gets the bp data and calculates the range and save it in range