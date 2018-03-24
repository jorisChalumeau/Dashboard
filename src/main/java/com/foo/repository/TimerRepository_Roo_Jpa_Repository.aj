// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.foo.repository;

import com.foo.domain.Timer;
import com.foo.repository.TimerRepository;
import com.foo.repository.TimerRepositoryCustom;
import io.springlets.data.jpa.repository.DetachableJpaRepository;
import org.springframework.transaction.annotation.Transactional;

privileged aspect TimerRepository_Roo_Jpa_Repository {
    
    declare parents: TimerRepository extends DetachableJpaRepository<Timer, Long>;
    
    declare parents: TimerRepository extends TimerRepositoryCustom;
    
    declare @type: TimerRepository: @Transactional(readOnly = true);
    
}