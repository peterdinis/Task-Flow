import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export type JwtPayload = {
	id: string;
	email: string;
};

// Token expirácia môžeš upraviť podľa potreby
export function signToken(payload: JwtPayload): Promise<string> {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" }, (err, token) => {
			if (err || !token) return reject(err);
			resolve(token);
		});
	});
}

export async function verifyToken(token: string): Promise<JwtPayload> {
	return new Promise((resolve, reject) => {
		jwt.verify(token, JWT_SECRET, (err, decoded) => {
			if (
				err ||
				typeof decoded !== "object" ||
				!decoded ||
				!("id" in decoded) ||
				!("email" in decoded)
			) {
				return reject(new Error("Invalid token payload"));
			}
			resolve(decoded as JwtPayload);
		});
	});
}
