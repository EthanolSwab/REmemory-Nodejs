import { response } from "../../../config/response.js";
import { status } from "../../../config/responseStatus.js";

import { getUserInfos } from "../user/userService.js";

import { createPcs_s } from "./pcapsuleService.js";

// API Name : pcapsule 생성 API
// [POST] /create
export const createPcs_c = async (req, res, next) => {
	// body: pcapsule_name, open_date, dear_name, theme, content_type, content
	try {
		const userId = req.user.userId;

		const userInfos = await getUserInfos({ userId: userId });
		const nickname = userInfos.data.nickname;

		const data = await createPcs_s(req.body, nickname);
		res.send(
			response(status.SUCCESS, {
				...data,
				capsule_number: data.capsule_number,
			}),
		);
	} catch (error) {
		next(error);
	}
};
