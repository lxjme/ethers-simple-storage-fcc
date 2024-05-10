// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// 0xd9145CCE52D386f254917e481eB44e9943F39138
contract SimpleStorage {
    uint256 favoriteNumber;
    People person = People({favoriteNumber: 2, name: "Lily"});

    struct People {
        uint256 favoriteNumber;
        string name;
    }

    // 定义整形数组
    uint256[] public favoriteNumberList;

    // 定义数组
    People[] public personList;

    // 定义map
    mapping(string => uint256) public nameToFavoriteNumber;

    function store(uint256 _favoriteNumber) public virtual {
        favoriteNumber = _favoriteNumber;
        retrieve();
    }

    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    // 添加数据到person数组
    function addPeople(string memory _name, uint256 _favoriteNumber) public {
        // （1）第一种添加方式
        // personList.push(People(_favoriteNumber, _name));

        // (2) 第二种添加方式
        People memory newPerson = People({
            favoriteNumber: _favoriteNumber,
            name: _name
        });

        personList.push(newPerson);
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
}
