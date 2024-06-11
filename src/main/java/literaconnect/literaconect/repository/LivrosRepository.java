package literaconnect.literaconect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import literaconnect.literaconect.model.Livros;

public interface LivrosRepository extends JpaRepository<Livros, Long>{
	
	@Query("SELECT l FROM Livros l " +
            "GROUP BY l " +
            "ORDER BY MAX(l.dataPublicacao) DESC LIMIT 5")
	public List<Livros> buscarLivrosMaisRecentes();
	
	@Query("SELECT l FROM Livros l WHERE l.numeroEstrelas IS NOT NULL ORDER BY l.numeroEstrelas DESC LIMIT 5")
	public List<Livros> buscarLivrosEmDestaque();

}
