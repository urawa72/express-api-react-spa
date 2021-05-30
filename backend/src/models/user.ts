import { Model, Sequelize, DataTypes, Optional } from 'sequelize';

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

// interface UserInstance
//   extends Model<UserAttributes, UserCreationAttributes>,
//     UserAttributes {}

export default class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize): typeof User {
    this.init(
      {
        id: {
          type: DataTypes.NUMBER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: DataTypes.STRING,
        email: { type: DataTypes.STRING, unique: true },
        password: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'users',
        underscored: true,
      },
    );
    return this;
  }

  public static associate(): void {
    return;
  }
}
