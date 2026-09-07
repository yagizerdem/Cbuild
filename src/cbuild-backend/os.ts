import os from "node:os";

const PLATFORM_NAMES = new Map([
  ["darwin", "macOS"],
  ["win32", "Windows"],
  ["linux", "Linux"],
  ["freebsd", "FreeBSD"],
  ["openbsd", "OpenBSD"],
  ["netbsd", "NetBSD"],
  ["aix", "AIX"],
  ["sunos", "SunOS"],
  ["android", "Android"],
]);

export function getOsInfo() {
  const platform = os.platform();
  const cpus = os.cpus();

  return {
    name: PLATFORM_NAMES.get(platform) ?? platform,
    platform,
    type: os.type(),
    release: os.release(),
    version: os.version(),
    hostname: os.hostname(),

    architecture: {
      machine: os.machine(),
      node: os.arch(),
    },

    cpu: {
      model: cpus[0]?.model ?? null,
      logicalCoreCount: cpus.length,
      availableParallelism: os.availableParallelism(),
    },

    memory: {
      totalBytes: os.totalmem(),
      freeBytes: os.freemem(),
    },

    uptimeSeconds: os.uptime(),

    directories: {
      home: os.homedir(),
      temp: os.tmpdir(),
    },

    isWindows: platform === "win32",
    isMacOS: platform === "darwin",
    isLinux: platform === "linux",
  };
}
