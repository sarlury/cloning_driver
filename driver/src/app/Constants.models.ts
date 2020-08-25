export class Constants {
	static URL_BASE: string = "https://development.newgaspol.com/";
	static URL_API: string = Constants.URL_BASE+"api/";
	static USER_API_KEY: string = "92F4A4B423E93ED4C44FDDDFC51E344A";
}

export let isCordovaAvailable = () => {
  if (!(<any>window).cordova) {
    console.log('This is a native feature. Please use a device');
    return false;
  }
  return true;
};
