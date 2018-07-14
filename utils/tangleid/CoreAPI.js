
/**
 * Class provide the core API of TangleID.
 */
class CoreAPI {
  /**
   * Create a API instance of TangleID.
   * @param {Object} settings - The settings of the TangleID.
   * @param {string} settings.provider - An address that provide the TanlgeID API.
   */
  constructor(settings) {
    this.provider = settings.provider;
  }

  fetchUserList() {
    return fetch(`${this.provider}/fetchUserList`)
      .then(response => response.json());
  }

  fetchUserInfo(uuid) {
    return fetch(`${this.provider}/user/${uuid}`)
      .then(response => response.json());
  }

  fetchClaims(uuid) {
    // forward request to Backend API
    return fetch(`${this.provider}/proxy/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        command: 'get_all_claims',
        uuid,
      }),
    }).then(response => response.json());
  }

  fetchClaimInfo(tansactionHash) {
    // forward request to Backend API
    return fetch(`${this.provider}/proxy/`, {
      method: 'POST',
      body: JSON.stringify({
        command: 'get_claim_info',
        hash_txn: tansactionHash,
      }),
    }).then(response => response.json())
      .then(data =>
        ({
          uuid: data.uuid,
          partA: data.part_a,
          partB: data.part_b,
          msg: data.msg,
          expiratedAt: data.exp_date,
          imageURL: data.claim_pic,
        }));
  }

  fetchMamMessages(uuid) {
    return fetch(`${this.provider}/mamFetch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ id: uuid }),
    }).then(response => response.json());
  }


  createClaim(uuid, formValues) {
    const claim = Object.assign({
      command: 'new_claim',
      uuid,
      part_a: '',
      part_b: '',
      exp_date: '',
      claim_pic: '',
      msg: '',
    }, formValues);

    // forward request to Backend API
    return fetch(`${this.provider}/proxy/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(claim),
    }).then(response => response.text());
  }
}

export default CoreAPI;
