interface CodeAndMsg {
	CODE: number;
	MESSAGE: string;
}

export class ErrorCode {
	static readonly Error: CodeAndMsg = { CODE: 400, MESSAGE: "请求错误" };
	static readonly TokenOverdue: CodeAndMsg = { CODE: 401, MESSAGE: "token过期" };
	static readonly Forbidden: CodeAndMsg = { CODE: 403, MESSAGE: "没有权限执行此操作" };

	static readonly NotFound: CodeAndMsg = { CODE: 404, MESSAGE: "找不到请求的资源" };
	static readonly TimeOut: CodeAndMsg = { CODE: 408, MESSAGE: "请求超时" };

	static readonly ServiceError: CodeAndMsg = { CODE: 500, MESSAGE: "服务器内部错误" };
	static readonly Unrealized: CodeAndMsg = { CODE: 501, MESSAGE: "服务未实现" };
	static readonly GatewayError: CodeAndMsg = { CODE: 502, MESSAGE: "网关错误" };

	static readonly ServiceNotUse: CodeAndMsg = { CODE: 503, MESSAGE: "服务不可用" };
	static readonly GatewayTimeOut: CodeAndMsg = { CODE: 504, MESSAGE: "网关超时" };
	static readonly ErrorVersion: CodeAndMsg = { CODE: 505, MESSAGE: "HTTP 版本不受支持" };
	static CodeToMessage(code: number): string {
		for (const key of Object.keys(this)) {
			if (this[key].CODE === code) {
				return this[key].MESSAGE;
			}
		}
		return "";
	}
	static HasCode(code: number): boolean {
		for (const key of Object.keys(this)) {
			if (this[key].CODE === code) {
				return true;
			}
		}
		return false;
	}
}
