const { z } = require('zod');

// Student Add Schema
const StudentAddSchema = z.object({
    // Temel bilgiler
    userId: z.number().optional(), // Güncelleme için opsiyonel
    name: z.string().min(1, "Name is required").max(100, "Name too long"),
    email: z.string().email("Invalid email format").max(100, "Email too long"),
    
    // Kişisel bilgiler
    gender: z.enum(["Male", "Female", "Other"]).optional(),
    phone: z.string().regex(/^[0-9+\-\s()]+$/, "Invalid phone format").optional(),
    dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD format").optional(),
    
    // Adres bilgileri
    currentAddress: z.string().max(50, "Address too long").optional(),
    permanentAddress: z.string().max(50, "Address too long").optional(),
    
    // Aile bilgileri
    fatherName: z.string().max(50, "Father name too long").optional(),
    fatherPhone: z.string().regex(/^[0-9+\-\s()]+$/, "Invalid phone format").optional(),
    motherName: z.string().max(50, "Mother name too long").optional(),
    motherPhone: z.string().regex(/^[0-9+\-\s()]+$/, "Invalid phone format").optional(),
    guardianName: z.string().max(50, "Guardian name too long").optional(),
    guardianPhone: z.string().regex(/^[0-9+\-\s()]+$/, "Invalid phone format").optional(),
    relationOfGuardian: z.string().max(30, "Relation too long").optional(),
    
    // Akademik bilgiler
    class: z.string().max(50, "Class name too long").optional(),
    section: z.string().max(30, "Section name too long").optional(),
    roll: z.number().int().positive("Roll must be positive").optional(),
    admissionDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD format").optional(),
    
    // Sistem bilgileri
    systemAccess: z.boolean().optional().default(true),
});

// Student Update Schema should be partial but name and email are required in student_add_update sql function
const StudentUpdateSchema = StudentAddSchema.partial();

const StudentSetStatusSchema = z.object({
    status: z.boolean(),
});

module.exports = {
    StudentAddSchema,
    StudentUpdateSchema,
    StudentSetStatusSchema,
};