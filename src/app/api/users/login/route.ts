import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import {connect} from "@/dbConfig/dbConfig";

connect();


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }

        //  check if password is valid or not 
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 })
        }

        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, { expiresIn: "1h" })
        const response = NextResponse.json({
            message: "Login successfully",
            success: true
        })
        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}