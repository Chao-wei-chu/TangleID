function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

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
    this.provider_local = settings.provider_local;
    this.provider_swarm = settings.provider_swarm;
  }

  fetchUserList() {
    return fetch(`${this.provider_local}/fetchUserList`)
      .then(handleErrors)
      .then(response => response.json())
      .catch((error) => {
        console.error(error);
      });
  }

  fetchUserInfo(uuid) {
    return fetch(`${this.provider_local}/user/${uuid}`)
      .then(handleErrors)
      .then(response => response.json())
      .catch((error) => {
        console.error(error);
      });
  }

  fetchClaims(uuid) {
    // forward request to Backend API
    return fetch(`${this.provider_swarm}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        command: 'get_all_claims',
        uuid,
      }),
    })
      .then(handleErrors)
      .then(response => response.json())
      .catch((error) => {
        console.error(error);
      });
  }

  fetchClaimInfo(tansactionHash) {
    // forward request to Backend API
    return fetch(`${this.provider_swarm}`, {
      method: 'POST',
      body: JSON.stringify({
        command: 'get_claim_info',
        hash_txn: tansactionHash,
      }),
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(data =>
        ({
          uuid: data.uuid,
          partA: data.part_a,
          partB: data.part_b,
          msg: data.msg,
          expiratedAt: data.exp_date,
          imageURL: data.claim_pic,
        }))
      .catch((error) => {
        console.error(error);
      });
  }

  fetchMamMessages(uuid) {
    return fetch(`${this.provider_local}/mamFetch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ id: uuid }),
    })
      .then(handleErrors)
      .then(response => response.json())
      .catch((error) => {
        console.error(error);
      });
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
    return fetch(`${this.provider_swarm}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(claim),
    })
      .then(handleErrors)
      .then(response => response.text())
      .catch((error) => {
        console.error(error);
      });
  }

  createIdentity(uuid, formValues) {
    const claim = Object.assign({
      command: 'new_user',
      uuid,
      first_name: '',
      last_name: '',
      cosignerp: '',
      cosigners: '',
      profile_picture: '',
      pk: '',
    }, formValues);

    // forward request to Backend API
    return fetch(`${this.provider_swarm}`, {
      method: 'POST',
      body: JSON.stringify(claim),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(handleErrors)
      .then(response => response.text())
      .catch((error) => {
        console.error(error);
      });
  }
}

export default CoreAPI;
