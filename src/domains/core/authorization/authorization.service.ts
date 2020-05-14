import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorizationService {
    public async findPermission(id: number) {}
}

/*

            //Find permissions in the cache
            if( isset( self::$permissions[ $id ] ) )
                return self::$permissions[$id];

            //Load Permissions
            $q = Doctrine_Query::create();
            $q->from('Permission');
            $q->useResultCache(true);
            $q->setResultCacheLifeSpan(60 * 5);
            $permissions = $q->fetchArray();

            //Reindex permissions
            foreach( $permissions as $k => $v ){
                self::$permissions[ $v['id'] ] = $v;
            }

            if( isset( self::$permissions[ $id ] ) )
                return self::$permissions[ $id ];
            else
                return null;
        }
 */
