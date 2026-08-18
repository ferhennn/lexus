export function Login() {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-white md:grid-cols-2">
      <div className="flex flex-col justify-center bg-ink px-16 py-12 text-white">
        <h1 className="text-6xl font-semibold leading-[1.05] tracking-tight">
          BUILD BETTER.
          <br />
          TOGETHER.
        </h1>
        <p className="mt-6 max-w-md text-base text-white/70">
          One intelligent workspace for planning, building, documenting and
          shipping software.
        </p>
      </div>
      <div className="flex flex-col justify-center px-16 py-12">
        <form className="mx-auto flex w-full max-w-sm flex-col gap-4">
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-mute">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-md border border-line px-3 py-2 text-sm outline-none focus:border-ink"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-mute">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-md border border-line px-3 py-2 text-sm outline-none focus:border-ink"
            />
          </div>
          <button
            type="submit"
            className="mt-2 rounded-md bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-black"
          >
            Continue
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex-1 rounded-md border border-line px-4 py-2 text-sm font-medium hover:bg-paper"
            >
              Continue with Google
            </button>
            <button
              type="button"
              className="flex-1 rounded-md border border-line px-4 py-2 text-sm font-medium hover:bg-paper"
            >
              Continue with GitHub
            </button>
          </div>
          <div className="mt-2 flex justify-between text-xs text-mute">
            <a href="#" className="hover:text-ink">
              Forgot password
            </a>
            <a href="#" className="hover:text-ink">
              Create account
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
