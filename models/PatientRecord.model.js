const { Schema, model } = require("mongoose");

const patientRecordSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId, ref: "User" ,
    },

    record:[{
      doctor: {type: Schema.Types.ObjectId, ref: "Doctor" },
 
      appointment: { type: Schema.Types.ObjectId, ref: "Appointment" },
     
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
        temperature: {
          value: {
            type: String,
          },
          range: {
            type: String,
          },
        },
      },
      complaints: {
        type: String,
      },
      description: {
        type: String,
      },
      prescribedMedications: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
  },
  {
    timestamps: true,
  }
);

patientRecordSchema.pre("save", function (next) {
  this.record.forEach((record) => {
    // Blood Pressure
    const [systolic, diastolic] = record.vitals.bloodPressure.value.split('/').map(Number);

    if (systolic > 140 || diastolic > 90) {
      record.vitals.bloodPressure.range = "High";
    } else if (systolic < 90 || diastolic < 60) {
      record.vitals.bloodPressure.range = "Low";
    } else {
      record.vitals.bloodPressure.range = "Normal";
    }

    // Heart Rate
    const heartRateValue = Number(record.vitals.heartRate.value);
    if (heartRateValue > 100) {
      record.vitals.heartRate.range = "High";
    } else if (heartRateValue < 60) {
      record.vitals.heartRate.range = "Low";
    } else {
      record.vitals.heartRate.range = "Normal";
    }

    // Pulse Rate
    const pulseRateValue = Number(record.vitals.pulseRate.value);
    if (pulseRateValue > 100) {
      record.vitals.pulseRate.range = "High";
    } else if (pulseRateValue < 60) {
      record.vitals.pulseRate.range = "Low";
    } else {
      record.vitals.pulseRate.range = "Normal";
    }

    // Temperature
    const temperatureValue = parseFloat(record.vitals.temperature.value);
    if (temperatureValue > 100.4) {
      record.vitals.temperature.range = "High Fever";
    } else if (temperatureValue < 97) {
      record.vitals.temperature.range = "Low";
    } else {
      record.vitals.temperature.range = "Normal";
    }
  });

  next();
});

const PatientRecord = model("PatientRecord", patientRecordSchema);

module.exports = PatientRecord;

