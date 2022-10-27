import { msalInstance } from './../index';
import { AppOwnsDataApiPermissionScopes } from "../AuthConfig";
import { PowerBiWorkspace, PowerBiReport, PowerBiDataset } from "./../models/PowerBiModels";

const PowerBiApiRoot: string = "https://api.powerbi.com/v1.0/myorg/";

export default class PowerBiService {

  static GetAccessToken = async (): Promise<string> => {
    const account = msalInstance?.getActiveAccount();
    if (account) {
      const response = await msalInstance.acquireTokenSilent({
        scopes: AppOwnsDataApiPermissionScopes,
        account: account
      });
  
      return response.accessToken;
    }
    else {
      return "";
    }
  
  };

  static GetWorkspaces = async (): Promise<PowerBiWorkspace[]> => {
    var restUrl = PowerBiApiRoot + "groups/";

    return fetch(restUrl, {
      headers: {
        "Accept": "application/json;odata.metadata=minimal;",
        "Authorization": "Bearer " + await this.GetAccessToken()
      }
    }).then(response => response.json())
      .then(response => { return response.value; });
  }


}