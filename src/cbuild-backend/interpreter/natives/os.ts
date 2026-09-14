import { LuaEngine } from "wasmoon";
import * as os from "node:os";

export const EOL = os.EOL;
export const devNull = os.devNull;
export const constants = os.constants;

export function availableParallelism() {
  return os.availableParallelism();
}

export function arch() {
  return os.arch();
}

export function cpus() {
  return os.cpus();
}

export function endianness() {
  return os.endianness();
}

export function freemem() {
  return os.freemem();
}

export function homedir() {
  return os.homedir();
}

export function hostname() {
  return os.hostname();
}

export function loadavg() {
  return os.loadavg();
}

export function machine() {
  return os.machine();
}

export function networkInterfaces() {
  return os.networkInterfaces();
}

export function platform() {
  return os.platform();
}

export function release() {
  return os.release();
}

export function tmpdir() {
  return os.tmpdir();
}

export function totalmem() {
  return os.totalmem();
}

export function type() {
  return os.type();
}

export function uptime() {
  return os.uptime();
}

export function version() {
  return os.version();
}

export function getPriority(pid?: number) {
  return os.getPriority(pid);
}

export function setPriority(priority: number): void;

export function setPriority(pid: number, priority: number): void;

export function setPriority(pidOrPriority: number, priority?: number) {
  if (priority === undefined) {
    os.setPriority(pidOrPriority);
  } else {
    os.setPriority(pidOrPriority, priority);
  }
}

export function userInfo(options: os.UserInfoOptions = {}) {
  return os.userInfo(options);
}

export default function register(engine: LuaEngine) {
  const osModule = Object.freeze({
    availableParallelism,
    arch,
    cpus,
    endianness,
    freemem,
    homedir,
    hostname,
    loadavg,
    machine,
    networkInterfaces,
    platform,
    release,
    tmpdir,
    totalmem,
    type,
    uptime,
    version,
    getPriority,
    setPriority,
    userInfo,
    EOL,
    devNull,
    constants,
  });

  // os namespace
  engine.global.set("os", { ...osModule });
}
